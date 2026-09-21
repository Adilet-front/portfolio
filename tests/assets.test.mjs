import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { profile, projects } from "../content/profile.ts";

const projectRoot = process.cwd();
const publicRoot = path.join(projectRoot, "public");
const diplomaRoot = path.join(publicRoot, "demos", "diploma");

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const absolutePath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(absolutePath) : [absolutePath];
    }),
  );

  return files.flat();
}

function publicFile(url) {
  return path.join(publicRoot, url.replace(/^\//, ""));
}

async function assertFileExists(filePath, label) {
  const fileStat = await stat(filePath);
  assert.ok(fileStat.isFile(), `${label} must resolve to a file: ${filePath}`);
  assert.ok(fileStat.size > 0, `${label} must not be empty: ${filePath}`);
}

function detectedRasterFormat(buffer) {
  if (buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) return ".jpg";
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return ".png";
  if (buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") return ".webp";
  return null;
}

test("profile project and certificate images exist", async () => {
  const imageUrls = [
    profile.avatar,
    ...profile.certificates.map((certificate) => certificate.image),
    ...projects.flatMap((project) => [
      project.cover.src,
      ...project.gallery.map((image) => image.src),
    ]),
  ];

  await Promise.all(
    imageUrls.map((url) => assertFileExists(publicFile(url), `profile image ${url}`)),
  );
});

test("raster file extensions match their encoded formats", async () => {
  const files = (await walk(publicRoot)).filter((file) =>
    /\.(?:jpe?g|png|webp)$/i.test(file),
  );

  for (const file of files) {
    const buffer = await readFile(file);
    const actual = detectedRasterFormat(buffer);
    const extension = path.extname(file).toLowerCase().replace(".jpeg", ".jpg");
    assert.equal(actual, extension, `${path.relative(projectRoot, file)} contains ${actual ?? "unknown data"}`);
  }
});

test("all relative diploma demo assets resolve to files", async () => {
  const sourceFiles = (await walk(diplomaRoot)).filter((file) =>
    /\.(?:html|css|js)$/i.test(file),
  );
  const missing = [];
  const assetPattern = /(?:src|href|data-src)=["']([^"']+)["']|url\(\s*["']?([^)'"\s]+)/gi;

  for (const sourceFile of sourceFiles) {
    const source = await readFile(sourceFile, "utf8");
    for (const match of source.matchAll(assetPattern)) {
      const rawReference = match[1] ?? match[2];
      const cleanReference = decodeURIComponent(
        rawReference.split("#", 1)[0].split("?", 1)[0],
      );

      if (
        !cleanReference ||
        /^(?:[a-z]+:|\/|#)/i.test(cleanReference) ||
        !/\.(?:css|html?|js|jpe?g|png|webp|svg|mp4)$/i.test(cleanReference)
      ) {
        continue;
      }

      const target = path.resolve(path.dirname(sourceFile), cleanReference);
      try {
        await assertFileExists(target, `asset referenced by ${sourceFile}`);
      } catch {
        missing.push(
          `${path.relative(projectRoot, sourceFile)} -> ${cleanReference}`,
        );
      }
    }
  }

  assert.deepEqual(missing, []);
});
