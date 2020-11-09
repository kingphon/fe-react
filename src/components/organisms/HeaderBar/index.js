import faker from "faker";
import React from "react";
import { Grid, Image, Dropdown, Segment } from "semantic-ui-react";

const trigger = (
    <span>
        <Image avatar src={faker.internet.avatar()} /> {faker.name.findName()}
    </span>
);

const options = [
    { key: "user", text: "Account", icon: "user" },
    { key: "settings", text: "Settings", icon: "settings" },
    { key: "sign-out", text: "Sign Out", icon: "sign out" }
];

const DropdownUser = props => (
    <Dropdown
        trigger={trigger}
        options={options}
        pointing="top left"
        icon={null}
        {...props}
    />
);

const HeaderBar = () => (
    <Grid as={Segment} style={{width: '100%', margin: 0, position: 'fixed', zIndex: 9998, top: 0}}>
        <Grid.Row style={{ padding: 8}}>
            <Grid.Column width={12} verticalAlign="middle">
                <Image
                    src="http://localhost:3000/images/logo.png"
                    alt="logo"
                    style={{ height: 36 }}
                />
            </Grid.Column>
            <Grid.Column width={4} textAlign="right" floated="right" verticalAlign="middle">
                <DropdownUser />
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default HeaderBar;
