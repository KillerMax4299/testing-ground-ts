import { Tabs,TabContent } from "@/components/ui/tabs"

const DemoTabs = () => {
  return (
    <div className="h-screen w-[40vw] bg-white dark:bg-zinc-900">
      <Tabs menus={["gram panchayat","State", "District", "Block", ]}>
        <TabContent>
          {/* State tab content */}
          <p>This is the content for the State tab.</p>
        </TabContent>
        <TabContent>
          {/* District tab content */}
          <p>This is the content for the District tab.</p>
        </TabContent>
        <TabContent>
          {/* Block tab content */}
          <p>This is the content for the Block tab.</p>
        </TabContent>
        <TabContent>
          
          <p>This is the content for the GP tab.</p>
        </TabContent>
        
      </Tabs>
    </div>
  );
}

export default DemoTabs