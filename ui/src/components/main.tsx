import { Tabs } from "@mantine/core";
import { useState } from "react";



export const Main = () => {
    const [activeTab, setActiveTab] = useState<string | null>('first');

    return (
        <Tabs  variant="outline" defaultValue="gallery" value={activeTab} onChange={setActiveTab}>
          <Tabs.List justify={"center"}>
            <Tabs.Tab value="first">Insert Item</Tabs.Tab>
            <Tabs.Tab value="second">Find Item</Tabs.Tab>
            <Tabs.Tab value="third">Delete Item</Tabs.Tab>
          </Tabs.List>
    
          <Tabs.Panel value="first">First panel</Tabs.Panel>
          <Tabs.Panel value="second">Second panel</Tabs.Panel>
          <Tabs.Panel value="third">dsaf panel</Tabs.Panel>

        </Tabs>
      );
}