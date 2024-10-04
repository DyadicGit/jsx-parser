export const TEMPLATES = {
  textNode: `<AppShell>
      Hello world
</AppShell>`,
  jsxNode: `<AppShell>
      <AppMenu />
</AppShell>`,
  jsxNodeArray: `<AppShell>
      <AppMenu />
      <AppContent />
</AppShell>`,
  jsxNodeTree: `<AppShell>
      <AppMenu />
      <AppContent>
          Hello world
      </AppContent>
</AppShell>`,
  jsxNodeTreeMixed: `<AppShell>
      <AppMenu>
        Menu
        <MenuItem>item 1</MenuItem>
        <MenuItem>item 2</MenuItem>
        <MenuItem>item 3</MenuItem>
      </AppMenu>
      <AppContent>
          Hello world
          <AppContent>
            Hello from AppContent
          </AppContent>
      </AppContent>
</AppShell>`,
};
