import { Box, Button, TabList, TabPanel, TabPanels, Tabs, useMultiStyleConfig, useTab } from "@chakra-ui/react"
import React from "react"
export default function CustomTabs(props) {
  const {contentTab1, contentTab2} = props;
  const CustomTab = React.forwardRef((props, ref) => {
    // 1. Reuse the `useTab` hook
    const tabProps = useTab({ ...props, ref })
    const isSelected = !!tabProps['aria-selected']

    // 2. Hook into the Tabs `size`, `variant`, props
    const styles = useMultiStyleConfig('Tabs', tabProps)

    return (
      <Button __css={styles.tab} {...tabProps}>
        <Box as='span' mr='2'>
          {isSelected ? '😎' : '😐'}
        </Box>
        {tabProps.children}
      </Button>
    )
  })

  return (
    <Tabs>
      <TabList>
        <CustomTab>One</CustomTab>
        <CustomTab>Two</CustomTab>
      </TabList>
      <TabPanels>
        <TabPanel>{contentTab1}</TabPanel>
        <TabPanel>{contentTab2}</TabPanel>
      </TabPanels>
    </Tabs>
  )
}