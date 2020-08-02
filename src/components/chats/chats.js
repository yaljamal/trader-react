import React , { useEffect } from 'react';
import {connect} from 'react-redux';
import {getRooms,getMessages} from '../../store/reducers/chat-Reducer';
import ChatMessages from './messages';
import ClientComponent from '../chat/index';
import { Link } from 'react-router-dom';


function Chats (props){

  console.log('HIIIII FROM CHAT COMPONENT');
  useEffect(() => {
    props.getRooms(props.token);
  },[]);

  return (
    // <section>
        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
       <div class="users-container">
            <ul class="users">
               
            {/* </ul> */}
{/* <ul> */}
{
props.rooms.map((room , i) =>{

return (
  <>
 <li class="person" data-chat="person1"  key={i}>
                    <div class="user">
                        <img src="https://www.bootdey.com/img/Content/avatar/avatar3.png" alt="Retail Admin"/>
                    </div>
                    <p class="name-time">
                        <span class="name">
      <Link to={`/chat/${props.username === room.firstUser ? room.secondUser : room.firstUser}`}>
        {props.username === room.firstUser ? room.secondUser : room.firstUser}
      </Link></span>
      {/* <span class="time">12/02/2019</span> */}
                    </p>
                </li>

  </>
);
})
}
</ul>
</div>
</div>


     
      // {/* <ChatMessages /> */}
    // {/* </section> */}
  );
}

const mapStateToProps = (state) =>{
  return {
    rooms : state.rooms.chatRooms ,
    token : state.auth.token ,
    username : state.auth.user.username ,
  };
} ;

const mapDispatchToProps = (dispatch) => ({
  getRooms:(token) => dispatch(getRooms(token)),
  getMessages:(messages) => dispatch(getMessages(messages)),
});

export default connect(mapStateToProps  , mapDispatchToProps)(Chats);


// <li key={i} onClick={ () =>{
//                   props.getMessages(room.messages);
//                 }}  >{room.secondUser}</li>