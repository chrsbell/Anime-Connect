import React from 'react';
import { Endpoints } from './constants.js';
import history from './history';
import { Router } from 'react-router';
import { Box, Button, Grommet, Form, FormField, MaskedInput, Text } from 'grommet';
import axios from 'axios';

const FormFieldLabel = (props) => {
  const { required, label, ...rest } = props;
  return (
    <FormField
      label={
        required ? (
          <Box direction="row">
            <Text>{label}</Text>
            <Text color="status-critical">*</Text>
          </Box>
        ) : (
          label
        )
      }
      required={required}
      {...rest}
    />
  );
};

class LoginForm extends React.Component {
  constructor({ history, authenticate }) {
    super();
    this.history = history;
    this.authenticate = authenticate;
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    this.authenticate();
  }

  render() {
    return (
      <Box
        fill="horizontal"
        overflow="hidden"
        height={{ min: '80vh' }}
        animation={{ type: 'zoomIn', duration: 500 }}
        justify="center"
        align="center"
      >
        <Box background="#F7F7F7" direction="column" width="large" gap="medium" pad="medium">
          <Form validate="blur" onSubmit={this.submit}>
            <FormFieldLabel label="username" name="username" required />
            <FormFieldLabel type="password" label="password" name="password" required />
            <Box direction="row" justify="between" margin={{ top: 'medium' }}>
              <Button label="Cancel" />
              <Button type="reset" label="Reset" />
              <Button type="submit" label="Login" primary />
            </Box>
          </Form>
        </Box>
      </Box>
    );
  }
}

export default LoginForm;
