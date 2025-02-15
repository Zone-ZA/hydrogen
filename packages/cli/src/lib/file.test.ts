import {temporaryDirectoryTask} from 'tempy';
import {describe, it, expect} from 'vitest';
import {findFileWithExtension, replaceFileContent} from './file.js';
import {resolvePath} from '@shopify/cli-kit/node/path';
import {readFile, writeFile} from '@shopify/cli-kit/node/fs';

describe('File utils', () => {
  describe('replaceFileContent', () => {
    it('replaces the content of a file and formats it', async () => {
      await temporaryDirectoryTask(async (tmpDir) => {
        const filepath = resolvePath(tmpDir, 'index.js');
        await writeFile(
          filepath,
          'function foo() { console.log("foo"); return null}',
        );

        await replaceFileContent(filepath, {}, async (content) => {
          return content.replaceAll('foo', 'bar');
        });
        expect(await readFile(filepath)).toBe(
          'function bar() {\n  console.log("bar");\n  return null;\n}\n',
        );
      });
    });
  });

  describe('findFileWithExtension', () => {
    it('ignores missing files', async () => {
      await temporaryDirectoryTask(async (tmpDir) => {
        expect(findFileWithExtension(tmpDir, 'nope')).resolves.toEqual({
          filepath: undefined,
          extension: undefined,
          astType: undefined,
        });
      });
    });

    it('finds the file with its corresponding extension and astType', async () => {
      await temporaryDirectoryTask(async (tmpDir) => {
        await writeFile(resolvePath(tmpDir, 'first.js'), 'content');
        await writeFile(resolvePath(tmpDir, 'second.tsx'), 'content');
        await writeFile(resolvePath(tmpDir, 'third.mjs'), 'content');

        expect(findFileWithExtension(tmpDir, 'first')).resolves.toEqual({
          filepath: expect.stringMatching(/first\.js$/),
          extension: 'js',
          astType: 'js',
        });

        expect(findFileWithExtension(tmpDir, 'second')).resolves.toEqual({
          filepath: expect.stringMatching(/second\.tsx$/),
          extension: 'tsx',
          astType: 'tsx',
        });

        expect(findFileWithExtension(tmpDir, 'third')).resolves.toEqual({
          filepath: expect.stringMatching(/third\.mjs$/),
          extension: 'mjs',
          astType: 'js',
        });
      });
    });
  });
});
