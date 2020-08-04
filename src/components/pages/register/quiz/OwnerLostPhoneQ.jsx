import React, { Component } from 'react';
import { handleIOSBrowser } from '../../../../util/browser-util';
import GoBackSvg from '../../../svg/GoBackSvg';
import OptionSvg from '../../../svg/OptionSvg';
import HasPhoneSvg from '../../../svg/HasPhoneSvg';
import './OwnerLostPhoneQ.scss';

export default class OwnerLostPhoneQ extends Component {
  static defaultProps = {
    handleGoForward: () => {},
    handleGoBack: () => {},
  };

  state = {
    options: ['lostPhoneOnceOrMore', 'lostPhoneNever'],
    selectedOption: undefined,
  };

  componentDidMount() {
    handleIOSBrowser();
    if (this.props.position === 'right') {
      this.refs.section.classList.add('section-right');
    } else if (this.props.position === 'left') {
      this.refs.section.classList.add('section-left');
    } else {
      this.refs.section.classList.add('section-center');
    }
    setTimeout(() => {
      this.refs.section.style.transform = 'translateX(0)';
      this.refs.section.style.opacity = '1';
    }, 1);
  }

  render() {
    const { options, selectedOption } = { ...this.state };
    return (
      <div ref="section" id="section-6-owner" className="section">
        <div className="section-contents">
          <div className="title">Document Owner</div>
          <div className="subtitle">More ways to login</div>
          <div className="card owner1">
            <div>
              <div className="card-title">
                In the last five years, how many times have you permanently lost
                your phone?
              </div>
            </div>
            <HasPhoneSvg />
            <div className="options">
              {options.map((option) => {
                const svgType = option === options[0] ? 'meh-phone' : 'smiley-phone';
                return (
                  <OptionSvg
                    key={option}
                    svgType={svgType}
                    handleClick={() => this.setState({ selectedOption: option })}
                    isSelected={selectedOption === option}
                  />
                );
              })}
            </div>
            <div className="section-container">
              <input
                style={{ width: '210px' }}
                type="button"
                value="Next"
                onClick={() => this.props.handleGoForward('owner', 7)}
                disabled={!selectedOption}
              />
            </div>
          </div>
          <GoBackSvg
            color="#2362c7"
            goBack={() => this.props.handleGoBack('owner', 6)}
          />
        </div>
      </div>
    );
  }
}