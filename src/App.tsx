import React from 'react';
import './App.scss';
import { Container, Col, Row, Card } from 'react-bootstrap';
import GForm from 'components/Gform';
import { IIValidation, IFormField } from 'interfaces/Form';
import axios from "axios";

const App = () => {
  const defValids: IIValidation = {
    fname: [
      { type: 'required', msg: 'First Name is required' },
      { type: 'min', numParam: 2, msg: 'First Name must be atleast 2 characters' },
    ],
    email: [
      { type: 'required', msg: 'Email is required' },
      { type: 'email', msg: 'Must be a valid email' },
    ],
    pass: [
      { type: 'required', msg: 'Password is required' },
      { type: 'min', numParam: 8, msg: 'Password must be atleast 8 characters' },
      { type: 'max', numParam: 14, msg: 'Password must be maximum 14 characters' },
    ]
  };

  const defFields: IFormField[] = [ // support form fields by default
    {
      name: 'fname', label: 'First Name', classes: 'mb-2',
    },
    {
      name: 'lname', label: 'Last Name', classes: 'mb-2'
    },
    {
      name: 'email', label: 'Email', classes: 'mb-2', ftype: 'email'
    },
    {
      name: 'pass', label: 'Password', classes: 'mb-2', ftype: 'password'
    }
  ];

  const signUp = (vals) => {
    console.log('signUp -> vals', vals);
    const { fname: firstName, lname: lastName = '', pass: password, email } = vals;
    return axios.post('https://api.raisely.com/v3/signup', {
      campaignUuid: '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a',
      data: {
        firstName,
        lastName,
        email,
        password
      }
    });
  };

  return (
    <Container className='main'>
      <Row>
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card body>
            <h3 className='text-center'>User Signup</h3>
            <GForm formClass='signup-form' btnLabel='Register' onFSubmit={signUp} fields={defFields} validations={defValids} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
