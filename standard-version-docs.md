# Using standard-version for Versioning and Changelog Generation

This document provides an overview of how to use [standard-version](https://github.com/conventional-changelog/standard-version) for automating versioning and changelog generation in your project.

## What is standard-version?

standard-version is a utility for versioning using [semver](https://semver.org/) and CHANGELOG generation powered by [Conventional Commits](https://www.conventionalcommits.org/).

It automates the process of:

- Bumping the version in `package.json`
- Generating an updated `CHANGELOG.md` file
- Committing the changes
- Tagging the commit with the new version

## Benefits of Using standard-version

- Enforces a consistent versioning scheme (semver)
- Automates version bumping based on commit types:
  - `BREAKING CHANGE`: Bumps the major version
  - `feat`: Bumps the minor version
  - `fix`: Bumps the patch version
- Generates a readable changelog based on commit history
- Integrates easily into CI/CD pipelines for automated releases

## Installation and Setup

1. Install standard-version as a dev dependency:

   ```bash
   npm install --save-dev standard-version
   ```

2. Add a `release` script to `package.json`:

   ```json
   {
     "scripts": {
       "release": "standard-version"
     }
   }
   ```

3. Create a `.versionrc` file to configure standard-version:
   ```json
   {
     "types": [
       { "type": "feat", "section": "Features" },
       { "type": "fix", "section": "Bug Fixes" },
       { "type": "chore", "section": "Maintenance" },
       { "type": "docs", "section": "Documentation" },
       { "type": "style", "section": "Styling" },
       { "type": "refactor", "section": "Refactoring" },
       { "type": "perf", "section": "Performance" },
       { "type": "test", "section": "Testing" }
     ],
     "commitUrlFormat": "{{host}}/{{owner}}/{{repository}}/commit/{{hash}}",
     "compareUrlFormat": "{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}",
     "releaseCommitMessageFormat": "chore(release): {{currentTag}}"
   }
   ```

## Using standard-version

To generate a new version and update the changelog:

```bash
npm run release
```

This command will:

1. Analyze your commits since the last release
2. Determine the new version number based on commit types
3. Update the version in `package.json`
4. Generate or update `CHANGELOG.md`
5. Create a new commit with the changes
6. Create a new git tag

### Common Options

- First Release:

  ```bash
  npm run release -- --first-release
  ```

- Specific Version:

  ```bash
  npm run release -- --release-as 1.1.0
  ```

- Dry Run:
  ```bash
  npm run release -- --dry-run
  ```

## Integrating with CI/CD Pipeline

standard-version can be integrated into your CI/CD pipeline for automated releases. Here's an example using Azure Pipelines:

```yaml
steps:
  - checkout: self
    fetchDepth: '0'
    submodules: recursive
    persistCredentials: 'true'

  - task: NodeTool@0
    inputs:
      versionSpec: '20.x'
    displayName: 'Install Node.js'

  - script: |
      npm ci
    displayName: 'Install dependencies'

  - script: |
      git config user.email "azure-pipeline@noreply.azure.com"
      git config user.name "Azure Pipeline"
    displayName: 'Configure git user'

  - script: |
      npm run release
    displayName: 'Generate CHANGELOG and bump version'
    condition: and(succeeded(), ne(variables['Build.Reason'], 'PullRequest'))

  - script: |
      git push --follow-tags origin HEAD:$(Build.SourceBranchName)
    displayName: 'Push changes'
    condition: and(succeeded(), ne(variables['Build.Reason'], 'PullRequest'))
```

This configuration will:

1. Checkout the code and fetch the full history
2. Install Node.js and project dependencies
3. Configure git user information
4. Run standard-version to bump the version and generate the changelog
5. Push the changes and new tag back to the repository

## Best Practices

1. Always use Conventional Commits format for your commit messages
2. Run standard-version only on your main/release branches
3. Keep your git history clean and meaningful
4. Review the generated changelog before pushing changes
5. Use the `--dry-run` option to preview changes

## Troubleshooting

If you encounter issues:

1. Ensure your commits follow the Conventional Commits format
2. Check if you have the correct permissions to push tags
3. Verify your git configuration is correct
4. Try running with `--dry-run` to debug issues
5. Check the git history to ensure it's clean and linear

For more information, refer to the [standard-version documentation](https://github.com/conventional-changelog/standard-version).
