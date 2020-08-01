import React from 'react';
import Card from '../slot/slot';
import CustomModal from '../modal/customModal';
import './style.scss';
import { connect } from "react-redux";
import { addEvent,deleteEvent } from '../../redux/calendar/action';
import moment from 'moment';
import {bindActionCreators} from "redux";

const special_class = "d-flex align-items-center justify-content-center";

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.timelist = ['7:00 AM', '8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];
    this.state = {
      card_booked: null,
      event_text: '',
      modal_open: false
    }
  }

  handleTextChange = (e) => {
    this.setState({event_text: e.target.value});
  }

  toggle_modal = () => {
    this.setState({modal_open: !this.state.modal_open})
  }

  cardClicked = (card_id) => {
    const event_name = this.props.events[card_id] ? this.props.events[card_id].name : '';
    this.setState({ card_booked: card_id, event_text: event_name, modal_open: !this.state.modal_open });
  }

  addingEvent = (event_name) => {
    this.props.addEvent(this.state.card_booked,{
      name: event_name,
      ...JSON.parse(this.state.card_booked)
    });
  }

  deletingEvent = (event_id) => {
    this.props.deleteEvent(event_id);
  }


  getWeek = () => {
    var currentDate = moment();
    var days = [];

    for (var i = 0; i <= 6; i++) {
      days.push({
        month: currentDate.format("MMMM"),
        date: currentDate.format('DD'),
        day: currentDate.format('dddd')
      });
      currentDate = currentDate.add(1, 'days');
    }

    return days;
  }

  showCurrentWeek() {
    const list_of_dates = this.getWeek()
    return(
        list_of_dates.map((date_val,i) => (
            <div className="flex-column">
              <div className={special_class}>
                {!i ? <div className="pr-4" style={{visibility:'hidden'}}>{'8:00 AM'}</div> : null}

                <div>
                  <div className="text-center week_day" key={`week_${i}`}>
                    {date_val.day}
                  </div>
                  <div className="text-center date" key={`date_${i}`}>
                    {date_val.date}
                  </div>
                </div>
              </div>

              {this.timelist.map(time => (
                  <div className={`${special_class} mt-3`}>
                    {!i ? <div className="pr-4"><b>{time}</b></div> : null}
                    <Card time={time} id={`${JSON.stringify({ ...date_val,time })}`} cardClicked={this.cardClicked} />
                  </div>
              ))}
            </div>
        ))
    );
  }


  render() {
    const { events } = this.props;

    return(
        <React.Fragment>
          <div className="calendar">
            <div className="container-fluid">
              <div className={special_class}>
                {this.showCurrentWeek()}
              </div>
            </div>
          </div>
          <CustomModal
              toggle={this.toggle_modal}
              modal_open={this.state.modal_open}
              card_booked={this.state.card_booked}
              events={events}
              addingEvent={this.addingEvent}
              deletingEvent={this.deletingEvent}
              handleTextChange={this.handleTextChange}
              event_text={this.state.event_text}
          />
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
      events: state.calendar.events,
      error: state.calendar.error
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addEvent, deleteEvent}, dispatch)
};

export default connect(mapStateToProps,mapDispatchToProps)(Calendar);