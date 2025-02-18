# Using Commitizen for Standardized Commit Messages

This document provides a guide on using [Commitizen](https://github.com/commitizen/cz-cli) to enforce standardized commit messages in your project.

## What is Commitizen?

Commitizen is a command-line utility that helps standardize commit messages across your project. It provides an interactive interface that guides developers through creating commit messages that follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Benefits of Using Commitizen

- Enforces consistent commit message format
- Provides an interactive interface for creating commits
- Ensures commit messages follow the Conventional Commits specification
- Makes it easier to generate changelogs
- Helps maintain a clean and readable git history

## Installation and Setup

1. Install Commitizen and the conventional changelog adapter:

   ```bash
   npm install --save-dev commitizen cz-conventional-changelog
   ```

2. Configure Commitizen in your `package.json`:

   ```json
   {
     "config": {
       "commitizen": {
         "path": "./node_modules/cz-conventional-changelog"
       }
     }
   }
   ```

3. Add a commit script to your `package.json`:
   ```json
   {
     "scripts": {
       "commit": "git-cz"
     }
   }
   ```

## Using Commitizen

Instead of using `git commit` directly, use:

```bash
npm run commit
```

This will start an interactive prompt that guides you through the commit process:

1. Select the type of change:

   - feat: A new feature
   - fix: A bug fix
   - docs: Documentation changes
   - style: Code style changes (formatting, etc.)
   - refactor: Code refactoring
   - perf: Performance improvements
   - test: Adding or updating tests
   - chore: Maintenance tasks

2. Enter the scope of the change (optional)

   - This helps categorize the change (e.g., "auth", "api", "ui")

3. Write a short description

   - A brief summary of your changes

4. Write a longer description (optional)

   - More detailed explanation of your changes

5. List any breaking changes (optional)

   - Changes that break backward compatibility

6. Reference any related issues (optional)
   - Link your commit to specific issues or pull requests

## Example Commit Flow

```bash
$ npm run commit

? Select the type of change that you're committing: (Use arrow keys)
❯ feat:     A new feature
  fix:      A bug fix
  docs:     Documentation only changes
  style:    Changes that do not affect the meaning of the code
  refactor: A code change that neither fixes a bug nor adds a feature
  perf:     A code change that improves performance
  test:     Adding missing tests or correcting existing tests

? What is the scope of this change? (e.g. component or file name): auth

? Write a short, imperative tense description of the change:
Add OAuth2 authentication support

? Provide a longer description of the change: (press enter to skip)
Implemented OAuth2 authentication flow with Google and GitHub providers.
Added necessary middleware and API routes.

? Are there any breaking changes? No

? Does this change affect any open issues? (y/N) y

? Add issue references (e.g. "fix #123", "re #123".):
Closes #456
```

## Best Practices

1. Keep commit messages clear and concise
2. Use the imperative mood in the subject line
3. Limit the subject line to 50 characters
4. Capitalize the subject line
5. Do not end the subject line with a period
6. Separate subject from body with a blank line
7. Wrap the body at 72 characters
8. Use the body to explain what and why vs. how

## Troubleshooting

If you encounter any issues:

1. Ensure you have staged your changes:

   ```bash
   git add .
   ```

2. Check if Commitizen is properly installed:

   ```bash
   npm list commitizen
   ```

3. Verify your Commitizen configuration in `package.json`

4. Try running Commitizen directly:
   ```bash
   npx git-cz
   ```

## Integration with Other Tools

Commitizen works well with:

- **standard-version**: For automated versioning and changelog generation
- **husky**: For git hooks
- **lint-staged**: For running linters on staged files
- **conventional-changelog**: For generating changelogs

For more information on these integrations, refer to their respective documentation.
