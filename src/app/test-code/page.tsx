"use client";

import { CodeBlock, MarkdownRenderer } from "@/components/shared/ui";

export default function TestCodePage() {
  const testMarkdown = `# Test Code Styling

This is a test to verify code blocks are working.

## JavaScript Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

## TypeScript Example

\`\`\`typescript
interface User {
  id: number;
  name: string;
}

const user: User = {
  id: 1,
  name: 'John'
};
\`\`\`

## Bash Example

\`\`\`bash
#!/bin/bash
echo "Hello World"
npm install
npm run dev
\`\`\`

## Inline Code

You can also use \`inline code\` like this.
`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Code Styling Test Page
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Test with MarkdownRenderer
          </h2>
          <MarkdownRenderer className="prose prose-lg dark:prose-invert">
            {testMarkdown}
          </MarkdownRenderer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Test with Direct CodeBlock
          </h2>
          <CodeBlock className="language-javascript">
            {`function test() {
  console.log("This is a direct CodeBlock test");
  return "success";
}`}
          </CodeBlock>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Test Raw HTML (Bypass ReactMarkdown)
          </h2>
          <div className="prose prose-lg dark:prose-invert">
            <h1>Raw HTML Test</h1>
            <p>This is a paragraph.</p>
            <div className="relative group my-6">
              <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-gray-800 px-4 py-3 rounded-t-lg border-b border-gray-700">
                <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">
                  JAVASCRIPT
                </span>
                <button className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-all duration-200 hover:scale-105 active:scale-95">
                  <span>Copy</span>
                </button>
              </div>
              <pre className="m-0 p-5 bg-gray-800 dark:bg-gray-900 text-gray-100 rounded-b-lg overflow-x-auto shadow-lg">
                <code className="text-sm leading-relaxed font-mono">
                  {`function test() {
  console.log("Raw HTML test");
  return "success";
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Debug Info
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Check browser console for debug logs</p>
            <p>Content length: {testMarkdown.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
