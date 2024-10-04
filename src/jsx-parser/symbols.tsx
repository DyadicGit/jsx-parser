export const AppShell = (props: React.ComponentPropsWithoutRef<"main">) => (
  <main className={`flex min-h-screen bg-gray-50`} {...props} />
);

export const AppMenu = (props: React.ComponentPropsWithoutRef<"nav">) => (
  <nav className={`w-64 bg-gray-300 p-4`} {...props} />
);

export const MenuItem = (props: React.ComponentPropsWithoutRef<"a">) => (
  <a
    className={`block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded`}
    {...props}
  />
);

export const AppContent = (
  props: React.ComponentPropsWithoutRef<"section">
) => (
  <section
    className={`flex-grow p-6 m-6 border-2 border-gray-400`}
    {...props}
  />
);
