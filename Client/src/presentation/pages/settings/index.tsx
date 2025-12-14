import { useState } from "react";
import { Sidebar, GlassAppBar } from "../../components";
import Profile from "./profile";
import { SettingsContainer, ContentWrapper, TabContainer, Tab, TabPanel, ColorBar } from "./style";

const Settings = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <SettingsContainer>
      <Sidebar />
      <ContentWrapper>
        <GlassAppBar title="Settings" />

        <TabContainer>
          <Tab active={currentTab === 0} onClick={() => setCurrentTab(0)}>
            Profile
          </Tab>
        </TabContainer>

        <TabPanel hidden={currentTab !== 0}>
          <Profile />
        </TabPanel>
      </ContentWrapper>

      {/* Color Bar */}
      <ColorBar />
    </SettingsContainer>
  );
};

export default Settings;
