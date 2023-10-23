/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Form, Button, Col, Row,
} from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getMembers, searchMembers } from '../api/memberData';
import MemberCard from '../components/MemberCard';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  console.warn(setSearchInput);

  const { user } = useAuth();

  const getAllTheMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllTheMembers();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value.toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMembers(searchInput, user.uid).then((response) => {
      const searchArray = response.map((member) => member);
      setMembers(searchArray);
    });
  };

  return (
    <>
      <div className="text-center my-4">
        <div className="search">
          <Form onSubmit={handleSubmit} inline="true">
            <Row>
              <Col style={{ marginLeft: '0.1rem', paddingRight: '0' }}>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                  name="searchInput"
                  onChange={handleChange}
                  value={searchInput}
                  required
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="d-flex flex-wrap">
          {members.map((member) => <MemberCard memberObj={member} onUpdate={getAllTheMembers} />)}
        </div>
      </div>
    </>
  );
}
