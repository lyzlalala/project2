import React from "react";
import { Form, Col, Button, Figure, Container, Card} from "react-bootstrap";
import "./index.css";

export const UpdateForm = (props) => {
  const RANKS = ["General", "Colonel", "Major", "Captain", "Lieutenant", "Warrant Officer", "Sergeant", "Corporal",
    "Specialist", "Private"];
  return (
    <div className="container">
        <h1>Update A Soldier</h1> <br/>
    <Form onSubmit={props.handleSubmit} noValidate>
      <Card border="dark">
        <Card.Body>

      <Container style={{display: "flex"}}>
      <Col>
      
      <Card style={{ width: '18em', height: "17rem" }}>
      <Figure className="img">
        <Figure.Image
          width={250}
          height={250}
          alt="250x250"
          src={props.state.Avatar}
        />
        <br />
      </Figure>
      
      </Card>
      <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>Please Upload a Photo with Size Not Large than 200x200</Form.Label>
        <Form.Control 
          type="file" 
          onChange={props.handleAvatar}
        />
      </Form.Group>
      
      </Col>
      <Col>
      <Card style={{ width: '42rem', height: "21rem" }}>
      <Card.Body>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>
            Name
          </Form.Label>
            <Form.Control
              onChange={props.handleName}
              onBlur={props.validationName}
              isInvalid={props.NameError !== null && props.NameError !== "" ? true : false}
              isValid={props.NameError === null ? true : false }
              defaultValue={props.state.Name}
              //isValid
            />
          <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">{props.NameError}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label sm={2}>Sex</Form.Label>
          <Form.Control as="select"
            onChange={props.handleSex}
            //isValid={props.Sex === 'Male' || props.Sex === "Female" ? true : false}
            isInvalid={props.Sex === "Choose Your Gender" ? true : false}
          > 
            <option>Choose Your Gender</option>
            <option value="Male" selected={props.state.Sex === "Male" ? true : false }>Male</option>
            <option value="Female" selected={props.state.Sex === "Female" ? true : false }>Female</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">Choose Your Gender</Form.Control.Feedback>
        </Form.Group>

      </Form.Row>
      


      <Form.Row>
        
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label sm={2}>Rank</Form.Label>
        <Form.Control 
          as="select"
          onChange={props.handleRank}
        >
          <option>Choose A Rank</option>
          {RANKS.map(rank => (
            <option selected={props.state.Rank === rank ? true : false}>{rank}</option>
          ))}
        </Form.Control>
      </Form.Group>
      
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label sm={2}>Superior</Form.Label>
        <Form.Control as="select"
          onChange={props.handleSuperior}
        >
          <option value="None" selected={props.state.Superior === null || props.state.Superior === "None" ? true : false}>None</option>
          {props.users.map(user => (
            <option value={user._id} selected={props.handleSelected(user._id)}>{user.Name}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group as={Col} controlId="formGridState">
        <Form.Label sm={2}>Start Date</Form.Label>
        <Form.Control 
          type="date"
          onChange={props.handleDate}
          defaultValue={props.state.StartDate}
        >
        </Form.Control>
        <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
      </Form.Group>

      </Form.Row>

      <Form.Row>
      <Form.Group as={Col}>
        <Form.Label>
          Email Address
        </Form.Label>
          <Form.Control
            type="email"
            onChange={props.handleEmail}
            onBlur={props.validationEmail}
            isInvalid={props.EmailError !== null && props.EmailError !== "" ? true : false}
            isValid={props.EmailError === null ? true : false }
            defaultValue={props.state.Email}
          />
        <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">{props.EmailError}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label>
          Phone Number
        </Form.Label>
          <Form.Control
            onChange={props.handlePhone}
            onBlur={props.validationPhone}
            isInvalid={typeof props.state.PhoneError === "string" && props.state.PhoneError.length > 0 ? true: false}
            defaultValue={props.state.Phone}
            type="tel"
          />
        <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">{props.PhoneError}</Form.Control.Feedback>
      </Form.Group>
      </Form.Row>
      </Card.Body>
      </Card>
      </Col>
      </Container>
      </Card.Body>
      </Card>
      <br/>
      <Form.Row>
        <Button 
          type='submit' 
          className="btn"
          disabled={props.handleCheckButton()}
        > 
          Submit
        </Button> 
        <Button 
          onClick={props.handleGoBack}
        >
          GO BACK
        </Button>
      </Form.Row>
    </Form>
    </div>
  );
};

export default UpdateForm;