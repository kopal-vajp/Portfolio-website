<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Structure
- Portfolio is a single-page TanStack Start app: one route (src/routes/index.tsx) composing presentational section components in src/components/ (Hero, About, Skills, Projects, Experience, Proof, Contact, Nav, Cursor, primitives). No backend, no server functions.
- Design tokens live only in src/styles.css (oklch); components never hardcode colors. Dark editorial theme is the only theme (no light/dark toggle).
