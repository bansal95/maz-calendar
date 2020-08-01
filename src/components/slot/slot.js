import React from 'react';
import './style.scss';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import { addEvent,deleteEvent } from '../../redux/calendar/action';
import {
  Card, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

let dragging_id = null;
let dropping_id = null;

class slot extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  dragEnd = (e) => {
    dragging_id = e.target.id;

    if (dropping_id && JSON.parse(dropping_id).day === 'Sunday') {
      alert("Can't be dragged on Sundays");
      return;
    }
    if (!dragging_id || !dropping_id) return;
    const {events} = this.props;

    if (events[dragging_id] && !events[dropping_id]) {
      this.props.addEvent(dropping_id, {
        ...events[dragging_id]
      });

      this.props.deleteEvent(dragging_id);

      dragging_id = null;
      dropping_id = null;
    } else {
      alert('Room not available!');
    }
  };

  render() {
    const { events,id,time } = this.props;

    const card_class = JSON.parse(id).day !== "Sunday" ? ((events[id]) ? 'card_custom_select' : 'card_custom') : 'card_custom_blocked';

    const card_values = (events[id]) ? events[id] : {};

    return (
      <div
        onDrop={(e) => {
          e.preventDefault();
          dropping_id = e.target.id;
        }}
        onDragOver={(e) => e.preventDefault()}
      >

        <Card className={`${card_class} mr-3`}
          onDragEnd={(e) => this.dragEnd(e)}
          draggable="true"
          id={this.props.id}
          onClick={() => JSON.parse(id).day === "Sunday" ? alert("Hey!! This is Sunday") : this.props.cardClicked(id)}
        >
          <CardBody id={id}>
            <CardTitle id={id}>{time}</CardTitle>
            <CardSubtitle id={id}>{JSON.parse(id).day === "Sunday" ? "Blocked" : card_values.name || 'Open'}</CardSubtitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    events: state.calendar.events,
    error: state.calendar.error
})


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addEvent, deleteEvent}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(slot);
