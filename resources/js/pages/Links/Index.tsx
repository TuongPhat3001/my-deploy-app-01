// @ts-nocheck
import { useForm } from '@inertiajs/react'
import React from 'react'

export default function Index({links, q, base})
{
    const {data, setData, processing, post, reset} = useForm({long_url: ''});

    const submit = (e) => {
        e.preventdefault();
        post('/links', {onSuccess: () => reset('long_url')});
    };

    const search = (e) => {
        e.preventdefault();
        const val = new FormData(e.target).get('q') || '';
        router.get('/', {q: val}, {preserverState: true });
    };

    const remove = (id) => router.delete(`/links/${id}`);

    function labelText(label)
    {
        if(label.includes('Previous') || label.includes('<<')) return '<<';
        if(label.includes('Next') || label.includes('>>')) return '>>';
        return label;
    }
    return(
        <div>
            <h1>Url Shorten App</h1>
            <form onSubmit={submit}>
                <input 
                    type="url"
                    placeholder="https://example.com/..."
                    value={data.long_url} onChange={(e)=>
                        setData('long_url', e.target.value)} />
                    <button disabled={processing}>Click to Shorten Url</button>
            </form>

            <thead>
                </thead>            
            <form onSubmit={search}>
                <input name="q" defaultValue={q ?? ''} placeholder="Search..." />
                <button>Search</button>
            </form>

            <table>
                <tbody>
                    {links.data.map((l)=>(
                        <tr key={l.id}>
                            <td>
                                <a href={`${base}/r/${l.code}`} target="_blank" rel="noreferrer">
                                {base}/r/{l.code}
                                </a>
                            </td>
                            <td>{l.long_url}</td>
                            <td>{l.clicks}</td>
                            <td>
                                <button type="button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                {links.links.map((q, i) => 
                    q.url ? (
                        <Link key={i} href={q.url} preserveScroll>
                            {labelText(q.label)}
                        </Link>
                    ) : (
                        <span key={i}>{labelText(q.label)}</span>
                    )
                )}
            </div>
        </div>
    )
}