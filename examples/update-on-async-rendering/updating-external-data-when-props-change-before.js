// Before
class ExampleComponent extends React.Component {
  state = {
    externalData: null,
  };

  componentDidMount() {
    this._loadAsyncData();
  }

  // highlight-range{1-6}
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({externalData: null});
      this._loadAsyncData();
    }
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.externalData === null) {
      // Render loading state ...
    } else {
      // Render real UI ...
    }
  }

  _loadAsyncData() {
    this._asyncRequest = asyncLoadData(this.props.id).then(
      externalData => {
        this._asyncRequest = null;
        this.setState({externalData});
      }
    );
  }
}
