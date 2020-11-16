import React from "react";
import Icon from '@material-ui/core/Icon'

const Fieldset = ({ icon, title, children, ...rest }) => (
  <fieldset
    style={{ border: "solid 1px #ccc", margin: "8px 0px", paddingTop: 8 }}
    {...rest}
  >
    <legend style={{ fontWeight: "bold" }}>
      {icon ? <Icon>{icon}</Icon> : null}
      {title}
    </legend>
    {children}
  </fieldset>
);

export default Fieldset;
