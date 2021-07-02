import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Boards from "../components/board/list/Boards";
import Terms from "../components/term/Terms";
import Groups from "../components/groups/Groups";
import GroupsProvider from "../components/groups/GroupsProvider";
import NewRoomProvider from "../components/room/list/newRoomProvider";
import newRoom from "../components/room/list/newRoom";
import GroupsDetail from "../components/groups/detail/GroupsDetail";
import MyPage from "../components/mypage/MyPage";
import CaRoom from "../components/caroom/CaRoom";
import CaRoomProvider from "../components/caroom/CaRoomProvider";
import BoardForm from "../components/board/form/BoardForm";
import BoardDetail from "../components/board/detail/BoardDetail";
import {RouteIf} from "../hoc/RouteIf";
import NoticeDetail from "../components/term/NoticeDetail";
import TermProvider from "../components/term/TermProvider";
import MyPageProvider from "../components/mypage/MyPageProvider";
import MyGroup from "../components/myGroup/MyGroup";

const RoomRoutes = ({match: {url}}) => (
    <NewRoomProvider>
        <Switch>
            <Route path={`${url}/list`} component={newRoom}/>
            <RouteIf path={`${url}/ca`} option={true} component={() => {
                return (<CaRoomProvider><CaRoom/></CaRoomProvider>)
            }}/>
            <RouteIf option={null} component={() => <Redirect to='/errors/404'/>}/>
        </Switch>
    </NewRoomProvider>
);

const BoardRoutes = ({match: {url}}) => (
    <Switch>
        <RouteIf path={`${url}/ca`} option={true} component={BoardForm}/>
        <RouteIf path={`${url}/list/:boardName`} option={null} component={Boards}/>
        <RouteIf path={`${url}/detail/:no`} option={true} component={BoardDetail}/>
        <RouteIf option={null} component={() => <Redirect to='/errors/404'/>}/>
    </Switch>
);

const GroupRoutes = ({match: {url}}) => (

    <Switch>

        <Route path={`${url}/list`} component={() => {
            return (<GroupsProvider><Groups/></GroupsProvider>)
        }}/>
        <RouteIf option={null} component={() => <Redirect to='/errors/404'/>}/>

    </Switch>

);

const TermRoutes = ({match: {url}}) => (
    <Switch>
        <RouteIf path={`${url}/detail/:no`} option={null} component={() => {
            return (<TermProvider><NoticeDetail/></TermProvider>)
        }}/>
        <RouteIf path={`${url}/:tab`} option={null} component={() => {
            return (<TermProvider><Terms/></TermProvider>)
        }}/>


        <RouteIf option={null} component={() => <Redirect to='/errors/404'/>}/>
    </Switch>
);

const DashboardRoutes = () => (
    <Switch>
        {/*Term*/}
        <Route path="/term" component={TermRoutes}/>

        {/*{room}*/}
        <Route path="/room" component={RoomRoutes}/>
        <Route path="/board" component={BoardRoutes}/>
        {/* profile */}

        {/*groups*/}
        <RouteIf exact path="/myGroup" option={true} component={MyGroup}/>
        <RouteIf path="/groups" component={GroupRoutes}/>

        <RouteIf path="/group/detail/:no" component={GroupsDetail} option={true}/>

        <RouteIf exact path="/profile" option={true} component={() => {
            return (<MyPageProvider><MyPage/></MyPageProvider>)
        }}/>

        <RouteIf option={null} component={() => <Redirect to='/errors/404'/>}/>


        {/*<Route path="/test"  component={Timer} />*/}

        {/*Redirect*/}

    </Switch>
);

export default DashboardRoutes;

