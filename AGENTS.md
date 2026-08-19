# Deployment ownership

- The repository root serves Peiyan Gu's personal homepage at `https://algpy.me/`.
- Never replace or redirect the root `index.html` to a nested project.
- The Nordic and Dubai travel guide is owned entirely by `nordic-dubai-field-guide/`.
- Travel-guide publishing must copy only into `nordic-dubai-field-guide/`; it must not synchronize a generated export root over this repository root.
- Before every push, verify that the root page title is `Peiyan Gu | Machine Learning Researcher` and that the root HTML contains no meta-refresh or `window.location` redirect.
- Also verify that `nordic-dubai-field-guide/index.html` remains independently available.
