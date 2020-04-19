import React from "react";
import { Table, Figure , Button } from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroll-component';
import "./index.css";

export const UsersTable = props => {
  return (
    <div className="sti-tbl-container">
    <div className="sti-tbl-header" >
      <Table striped bordered hover className="table table-bordered" style={{"marginBottom": "0px", "borderBottomStyle": "none"}} >
        <thead>
          <tr>
          <th style={{width: "6%"}}>Avatar</th> 
          <th style={{width: "8%"}}>
            Name
            <i className={props.handleSortButton("Name")} onClick={() => props.handleSort("Name")}></i>
          </th> 
          <th style={{width: "7%"}}>
            Sex
            <i className={props.handleSortButton("Sex")} onClick={() => props.handleSort("Sex")}></i>
          </th> 
          <th style={{width: "10%"}}>
            Start Date
            <i className={props.handleSortButton("StartDate")} onClick={() => props.handleSort("StartDate")}></i>
            </th> 
          <th style={{width: "12%"}}>
            Rank
            <i className={props.handleSortButton("Rank")} onClick={() => props.handleSort("Rank")}></i>
            </th> 
          <th style={{width: "10%"}}>
            Phone
            <i className={props.handleSortButton("Phone")} onClick={() => props.handleSort("Phone")}></i>
          </th> 
          <th style={{width: "16.5%"}}>
            Email
            <i className={props.handleSortButton("Email")} onClick={() => props.handleSort("Email")}></i>
          </th> 
          <th style={{width: "8%"}}>Superior</th> 
          <th style={{width: "8%"}}># of D.S. </th> 
          <th style={{width: "6%"}}>Edit</th>
          <th style={{width: "8.5%"}}>Delete</th> 
          </tr>
        </thead>
      </Table >
    </div>
    <InfiniteScroll
      dataLength={props.users.data.length}
      next={props.loadData}
      hasMore={props.users.hasMore}
      height={500}
      initialScrollY={200}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>---------All Users Are Loaded--------</b>
        </p>
      }>
    <div className="sti-tbl-body">
      <Table striped bordered hover className="table table-bordered">
        <tbody>
            {props.users.data.map(user => (
              <tr key={user._id}>
                <td style={{width: "6%"}}>
                  <Figure style={{height: "5px"}}>
                    <Figure.Image
                      width={30}
                      height={30}
                      alt="Photo of Soldier"
                      src={user.Avatar}
                    />
                  </Figure>
                </td>
                <td style={{width: "8%"}}>{user.Name}</td>
                <td style={{width: "7%"}}>{user.Sex}</td>
                <td style={{width: "10%"}}>{user.StartDate}</td>
                <td style={{width: "12%"}}>{user.Rank}</td>
                <td style={{width: "10%"}}><a href={`tel: ${user.Phone}`}>{user.Phone}</a></td>
                <td style={{width: "16.5%"}}><a href={`mailto: ${user.Email}`}>{user.Email}</a></td>
                {user.Superior ? <td style={{width: "8%"}}><u onClick={() => props.handleMany([user.Superior._id])}>{user.Superior.Name}</u></td> : <td style={{width: "8%"}}>{""}</td>}
                {user.Subordinate.length > 0 ? <td style={{width: "8%"}}><u onClick={() => props.handleMany([user.Subordinate])}>{user.Subordinate.length}</u></td > : <td style={{width: "8%"}}>{""}</td>}
                <td style={{width: "6%"}}><Button 
                //ref={ref => props.ref[user._id]=ref}
                onClick={() => props.handleEdit(user._id)}
                >Edit</Button></td>
                <td style={{width: "8.5%"}} onClick={() => props.handleDelete(user._id)}><Button>Delete</Button></td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
    </InfiniteScroll>
    </div>
  );
};