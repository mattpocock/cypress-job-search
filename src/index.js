/* global document, fetch */
import React from 'react';
import { render } from 'react-dom';
import styles from './css/index.scss';
import sortAndFilterJobs from './helperFunctions/sortAndFilterJobs';

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
            .then(json => this.setState({
                /**
                 * Filters out hidden jobs
                 */
                jobs: sortAndFilterJobs(json),
            }));
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
        }).then(() => this.updateJobs());
    }
    render() {
        return (
            <table style={styles} className="Table">
                <tbody>
                    {this.state.jobs.map(job => (
                        <tr
                            key={job.id}
                            style={job.worthApplyingFor ? { backgroundColor: 'lightgreen' } : {}}
                            
                        >
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
                                <button
                                    onClick={
                                        () => this.handleBoxChecked(
                                            'hidden',
                                            true,
                                            job.id,
                                            job,
                                        )
                                    }
                                >
                                    Hide
                                </button>
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
}

render(
    <App />,
    document.getElementById('root'),
);
