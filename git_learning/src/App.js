import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import canvas from './component/canvas'

export default function App() {
    return (
        <Container fluid>
            <div className="w-75" style={{maxWidth:"600px"}}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={canvas} />
                    </Switch>
                </Router> 
            </div>
            
        </Container>
    )
}