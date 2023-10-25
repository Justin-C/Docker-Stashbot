import { useState } from "react";
import { AppShell, Burger, Button, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Main } from "./components/main";

function App() {
  const [activeTab, setActiveTab] = useState<string | null>("first");
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Main>
        <Main />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
