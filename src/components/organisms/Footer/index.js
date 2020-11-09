import faker from "faker";
import React from "react";
import { Grid, Image, Dropdown, Segment } from "semantic-ui-react";

const Footer = (props) => (
    <Grid as={Segment} style={{width: '100%', height: 60, margin: 0}}>
        <Grid.Row style={{ padding: 8}}>
            <Grid.Column width={12} verticalAlign="middle">
                <span>Công ty TNHH BoDoi</span>
            </Grid.Column>
            <Grid.Column width={4} textAlign="right" floated="right" verticalAlign="middle">
                <a href="https://grit.vn">GRIT.vn</a>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default Footer;
