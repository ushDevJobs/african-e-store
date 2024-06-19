import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

type Props = {
  children: ReactNode;
};

const Providers = (props: Props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default Providers;
