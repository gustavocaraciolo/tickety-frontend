# Regra: Fidelidade ao Design System (DS)

## Objetivo
Garantir que todo código gerado siga estritamente o Design System atual, reutilize componentes existentes e crie novos apenas quando necessário, mantendo consistência visual e técnica.

## Regras obrigatórias

1. **NUNCA crie estilos inline, classes CSS avulsas ou componentes duplicados.**
   - Use apenas tokens do DS (cores, espaçamentos, tipografia, bordas, sombras).
   - Use apenas componentes já existentes no projeto.

2. **Sempre verifique primeiro:**
   - Existe um componente semelhante em `/components/` ou `/ui/`?
   - Existe um token correspondente em `theme.ts`, `tokens/`, ou `design-tokens.json`?
   - Existe um padrão já definido em `storybook`, `figma`, ou `docs/`?

3. **Se o componente NÃO existir:**
   - Crie um **novo componente** com nome no padrão: `PascalCase`, prefixo se aplicável (ex: `Button`, `Card`, `InputText`).
   - Use **apenas tokens do DS** (ex: `theme.colors.primary`, `theme.spacing.md`, `theme.typography.body1`).
   - Adicione `data-testid` se for um componente interativo.
   - Exporte com `export { ComponentName }` e adicione ao `index.ts` do diretório.

4. **Proibido:**
   - Cores hardcoded (#fff, rgb(), etc)
   - Espaçamentos em px fixos (use `theme.spacing`)
   - Tipografia fora do theme
   - Bordas, sombras ou efeitos fora do DS
   - Classes Tailwind arbitrárias (só use as que estão no `tailwind.config` ou no DS)

5. **Sempre importe do local correto:**
   ```ts
   import { Button } from '@/components/ui/button'
   import { cn } from '@/lib/utils'
   import { theme } from '@/styles/theme'