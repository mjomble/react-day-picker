import React from 'react';
import PropTypes from './PropTypes';
import Weekdays from './Weekdays';
import { getWeekArray } from './Helpers';

export default function Month({
  classNames,

  month,
  months,

  fixedWeeks,
  captionElement,
  weekdayElement,

  locale,
  localeUtils,
  weekdaysLong,
  weekdaysShort,
  firstDayOfWeek,

  onCaptionClick,
  children,
}) {
  const captionProps = {
    date: month,
    classNames,
    months,
    localeUtils,
    locale,
    onClick: onCaptionClick ? e => onCaptionClick(month, e) : undefined,
  };
  const caption = React.isValidElement(captionElement) ?
    React.cloneElement(captionElement, captionProps) :
    React.createElement(captionElement, captionProps);

  const weeks = getWeekArray(month, firstDayOfWeek, fixedWeeks);
  return (
    <div className={ classNames.month } role="grid">
      {caption}
      <Weekdays
        classNames={ classNames }
        weekdaysShort={ weekdaysShort }
        weekdaysLong={ weekdaysLong }
        firstDayOfWeek={ firstDayOfWeek }
        locale={ locale }
        localeUtils={ localeUtils }
        weekdayElement={ weekdayElement }
      />
      <div className={ classNames.body } role="rowgroup">
        {
          weeks.map((week, j) =>
            <div key={ j } className={ classNames.week } role="gridcell">
              {week.map(day => children(day, month))}
            </div>,
        )}
      </div>
    </div>
  );
}

Month.propTypes = {
  classNames: PropTypes.shape({
    month: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    week: PropTypes.string.isRequired,
  }).isRequired,

  month: PropTypes.instanceOf(Date).isRequired,
  months: PropTypes.arrayOf(PropTypes.string),

  fixedWeeks: PropTypes.bool,
  captionElement: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.instanceOf(React.Component),
  ]).isRequired,
  weekdayElement: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.instanceOf(React.Component),
  ]),

  locale: PropTypes.string.isRequired,
  localeUtils: PropTypes.localeUtils.isRequired,
  weekdaysLong: PropTypes.arrayOf(PropTypes.string),
  weekdaysShort: PropTypes.arrayOf(PropTypes.string),
  firstDayOfWeek: PropTypes.number.isRequired,

  onCaptionClick: PropTypes.func,

  children: PropTypes.func.isRequired,
};
