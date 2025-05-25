const themes = {
  default: `
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem; background: #fff; }
                h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 0.5rem; }
                h2 { color: #34495e; margin-top: 2rem; }
                h3 { color: #7f8c8d; }
                blockquote { border-left: 4px solid #3498db; padding-left: 1rem; color: #7f8c8d; font-style: italic; }
                code { padding: 0.2rem 0.4rem; border-radius: 3px; }
                pre { background: #2c3e50; color: #ecf0f1; padding: 1rem; border-radius: 5px; overflow-x: auto; }
                a { color: #3498db; text-decoration: none; }
                a:hover { text-decoration: underline; }
                img {max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0; }
            `,
            dark: `
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #e2e8f0; max-width: 800px; margin: 0 auto; padding: 2rem; background: #1a202c; }
                h1 { color: #f7fafc; border-bottom: 2px solid #4299e1; padding-bottom: 0.5rem; }
                h2 { color: #cbd5e0; margin-top: 2rem; }
                h3 { color: #a0aec0; }
                blockquote { border-left: 4px solid #4299e1; padding-left: 1rem; color: #a0aec0; font-style: italic; }
                code { padding: 0.2rem 0.4rem; border-radius: 3px; color: #f7fafc; }
                pre { background: #1a202c; color: #f7fafc; padding: 1rem; border-radius: 5px; overflow-x: auto; border: 1px solid #4a5568; }
                a { color: #63b3ed; text-decoration: none; }
                a:hover { text-decoration: underline; }
                img {max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0; }
            `,
        minimal: `
                body { font-family: 'Georgia', serif; line-height: 1.8; color: #333; max-width: 700px; margin: 0 auto; padding: 3rem 2rem; background: #fff; }
                h1 { font-size: 2.5rem; font-weight: 300; color: #000; margin-bottom: 2rem; }
                h2 { font-size: 1.8rem; font-weight: 400; color: #333; margin-top: 3rem; margin-bottom: 1rem; }
                h3 { font-size: 1.3rem; font-weight: 500; color: #666; }
                p { margin-bottom: 1.5rem; }
                blockquote { border-left: 2px solid #ddd; padding-left: 1rem; color: #666; font-style: italic; margin: 1rem 0; }
                code { font-family: 'Monaco', monospace; padding: 0.1rem 0.3rem; }
                pre { background: #f8f8f8; padding: 1.5rem; border-radius: 3px; overflow-x: auto; font-size: 0.9rem; }
                a { color: #000; border-bottom: 1px solid #ddd; text-decoration: none; }
                a:hover { border-bottom: 1px solid #000; }
                img {max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0; }
            `,
        blog: `
                body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.7; color: #374151; max-width: 900px; margin: 0 auto; padding: 2rem; background: #fafafa; }
                .container { background: white; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
                h1 { font-size: 2.5rem; font-weight: 700; color: #1f2937; margin-bottom: 1rem; line-height: 1.2; }
                h2 { font-size: 1.8rem; font-weight: 600; color: #374151; margin: 2.5rem 0 1rem 0; }
                h3 { font-size: 1.3rem; font-weight: 500; color: #4b5563; margin: 2rem 0 0.5rem 0; }
                p { margin-bottom: 1.5rem; font-size: 1.1rem; }
                blockquote { background: #f3f4f6; border-left: 4px solid #8b5cf6; padding: 1rem 1.5rem; margin: 2rem 0; border-radius: 0 8px 8px 0; }
                code { padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.9em; }
                pre { background: #1e293b; color: #e2e8f0; padding: 1.5rem; border-radius: 8px; overflow-x: auto; margin: 1.5rem 0; }
                a { color: #8b5cf6; text-decoration: none; font-weight: 500; }
                a:hover { text-decoration: underline; }
                ul, ol { margin: 1rem 0; }
                li { margin: 0.5rem 0; }
                img {max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0; }
            `,
      };

export default themes