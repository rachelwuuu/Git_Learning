import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import canvas from './component/canvas'

export default function App() {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{
            minHeight:"100vh"}}>
            <div className="d-flex w-75 justify-content-center align-items-between flex-column" style={{maxWidth:"600px", border:"solid green"}}>
               <Router>
                    <Switch>
                        <Route exact path="/" component={canvas} />
                    </Switch>
               </Router>
            </div>
            
        </Container>
    )
}