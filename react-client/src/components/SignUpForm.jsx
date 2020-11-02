import React from 'react';
import { Endpoints } from './constants.js';
import history from './history';
import { grommet } from 'grommet/themes';
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

class SignUpForm extends React.Component {
  constructor({ history, authenticate }) {
    super();
    this.history = history;
    this.authenticate = authenticate;
    this.signUp = this.signUp.bind(this);
  }

  // save user information to database, then authenticate to sign in
  signUp(e) {
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
          <Form validate="blur" onSubmit={this.signUp}>
            <FormFieldLabel
              label="username"
              name="username"
              required
              validate={[
                {
                  regexp: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
                  message: 'Username contains invalid characters',
                },
                (username) => {
                  if (username && (username.length < 3 || username > 20)) {
                    return `Username must be between 3 and 20 characters`;
                  }
                  return undefined;
                },
                (username) => {
                  if (username === 'good')
                    return {
                      message: (
                        <Box align="end">
                          <StatusGood />
                        </Box>
                      ),
                      status: 'info',
                    };
                  return undefined;
                },
              ]}
            />
            <FormFieldLabel
              label="password"
              name="password"
              required
              validate={[
                {
                  regexp: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    'Must be at least 8 characters and contain at least one number and special character',
                },
                (password) => {
                  if (password === 'good')
                    return {
                      message: (
                        <Box align="end">
                          <StatusGood />
                        </Box>
                      ),
                      status: 'info',
                    };
                  return undefined;
                },
              ]}
            />
            <FormFieldLabel
              label="Email"
              name="email"
              type="email"
              placeholder="example@my.com"
              required
            />
            <Box direction="row" justify="between" margin={{ top: 'medium' }}>
              <Button
                label="Cancel"
                onClick={() => {
                  this.history.push(Endpoints.browse);
                }}
              />
              <Button type="reset" label="Reset" />
              <Button type="submit" label="Submit" primary />
            </Box>
          </Form>
        </Box>
      </Box>
    );
  }
}

export default SignUpForm;
