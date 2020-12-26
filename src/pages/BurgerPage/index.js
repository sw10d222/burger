import React, { Component } from "react";
import Burger from "../../components/Burger";
import BuildControls from "../../components/BuildControls";
import Modal from "../../components/General/Modal";
import OrderSummery from "../../components/OrderSummary";

class BurgerPage extends Component {
  state = {
    confirmOrder: false,
  };

  showConfirmModal = () => {
    this.setState({ confirmOrder: true });
  };

  closeConfirmModal = () => {
    this.setState({ confirmOrder: false });
  };

  continueOrder = () => {
    this.props.history.push("/ship");
  };

  render() {
    return (
      <div>
        <Modal
          closeConfirmModal={this.closeConfirmModal}
          show={this.state.confirmOrder}
        >
          <OrderSummery
            onCancel={this.closeConfirmModal}
            onContinue={this.continueOrder}
          />
        </Modal>

        <Burger />

        <BuildControls
          showConfirmModal={this.showConfirmModal}
          ortsHasah={this.props.burgereesOrtsHas}
          ortsNemeh={this.props.burgertOrtsNem}
        />
      </div>
    );
  }
}

export default BurgerPage;
