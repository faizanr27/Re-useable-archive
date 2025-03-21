# How to partially clone a repo using sparse checkout

If the repository structure is like this:

```
web2md
├── backend
└── frontend
```
And you want to clone only the backend directory, follow these steps:

# Using Sparse Checkout (Recommended)
```
git clone --no-checkout <repo-url>
cd web2md
git sparse-checkout init --cone
git sparse-checkout set backend
git checkout
```
This will fetch only the backend directory and its Git history.

