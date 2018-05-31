import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
        };

        this.updateJobs = this.updateJobs.bind(this);
        this.handleBoxChecked = this.handleBoxChecked.bind(this);
    }
    componentDidMount() {
        this.updateJobs();
    }
    updateJobs() {
        fetch('http://localhost:3000/jobs', {
            method: 'GET',
        }).then(response => response.json())
        .then(json => this.setState({ jobs: json }));
    }
    handleBoxChecked(field, value, id, job) {
        fetch(`http://localhost:3000/jobs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...job,
                [field]: value,
            }),
        }).then(response => this.updateJobs());
    }
    render() {
        return (
            <table>
                <tbody>
                    {this.state.jobs.map(job => (
                        <tr key={job.id}>
                            <td>{job.date}</td>
                            <td>
                                <a
                                    href={job.href}
                                    target="_blank"
                                    onClick={() => this.handleBoxChecked(
                                        'checkedItOut',
                                        true,
                                        job.id,
                                        job,
                                    )}
                                >
                                    {job.title}
                                </a>
                            </td>
                            <td>
                                <label>
                                    Checked?
                                    <input
                                        type="checkbox"
                                        checked={job.checkedItOut}
                                        onChange={
                                            ({ target }) => this.handleBoxChecked(
                                                'checkedItOut',
                                                target.checked,
                                                job.id,
                                                job,
                                            )
                                        }
                                    />
                                </label>
                            </td>
                            <td>
                                <label>
                                    Worth Applying For?
                                    <input
                                        type="checkbox"
                                        checked={job.worthApplyingFor}
                                        onChange={
                                            ({ target }) => this.handleBoxChecked(
                                                'worthApplyingFor',
                                                target.checked,
                                                job.id,
                                                job,
                                            )
                                        }
                                    />
                                </label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
};

render(
    <App />,
    document.getElementById('root'),
);