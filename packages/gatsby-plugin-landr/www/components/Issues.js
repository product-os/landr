import React from 'react';
import {
  Flex,
  Row,
  Box,
  Card,
  Text,
  Circle,
  Subhead,
  Truncate,
  Divider,
  Button
} from 'rebass';
import Link from 'www/components/Link';
import Section from 'www/components/Section';
import IssueIcon from 'react-icons/lib/go/issue-opened';
import { withTheme } from 'styled-components';

const Issue = ({ issue, theme, dark }) => {
  return (
    <Box w={[1, 1 / 3]}>
      <Card mt={3} mx={1} p={3}>
        <Flex align="center">
          <Box mx="auto" my={3}>
            <IssueIcon size={30} />
          </Box>
        </Flex>
        <Link to={issue.html_url} blank>
          {issue.title}
        </Link>
        <Divider />
        <Truncate f={1}>
          {issue.body}
        </Truncate>
      </Card>
    </Box>
  );
};

class Issues extends React.Component {
  constructor(props) {
    super(props), (this.state = {
      issues: null
    });
  }

  componentDidMount() {
    const URL = `https://api.github.com/search/issues?q=repo:${this.props.repo
      .full_name}+state:open&sort=created&order=desc`;
    fetch(URL)
      .then(res => res.json())
      .then(res => {
        this.setState({ issues: res.items.slice(0, 3) });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const issues = this.state.issues;
    return (
      <Section py={4} title="Get involved">
        <Text mt={2} f={3} center>
          Here are a couple issues we need help with...
        </Text>
        <Flex wrap>
          {issues &&
            issues.map((issue, i) => {
              return (
                <Issue key={i} issue={issue} theme={this.props.theme} dark />
              );
            })}
        </Flex>
        <Text center mt={4}>
          <Button
            is={Link}
            bg="base"
            color="white"
            to={`${this.props.repo.html_url}/issues`}
            blank
          >
            View More
          </Button>
        </Text>
      </Section>
    );
  }
}

export default withTheme(Issues);
