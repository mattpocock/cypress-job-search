export default jobs => (
    jobs.filter(job => !job.hidden)
        .sort((a, b) => a.title.attr.localeCompare(b.attr))
);
