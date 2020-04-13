import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

const AppFooter = () => (
  <Footer>
    <Text>
      Food Data Source: U.S. Department of Agriculture, Agricultural Research Service. FoodData Central, 2019.
    </Text>
    &nbsp;
    <a
      href="https://fdc.nal.usda.gov/"
      target="_blank"
      rel="noopener noreferrer"
    >
      fdc.nal.usda.gov
    </a>
  </Footer>
);

export default AppFooter;
