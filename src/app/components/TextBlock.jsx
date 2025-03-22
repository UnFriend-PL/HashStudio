export default function TextBlock() {
    return (
        <div style={{
            backgroundColor: '#210002',
            color: '#ffaf1b',
            height: '50vh',
            padding: '2rem',
        }}
        >
            <h1 style={{fontSize: '2rem', fontWeight: '600'}}>
                What is Firewatch?
            </h1>
            <p style={{fontSize: '1.2rem', lineHeight: '1.5'}}>
                The year is 1989...
            </p>

            <div style={{padding: 40}}>
                <h1>Przykładowa strona</h1>

                <p>Najedź na mnie, żeby zobaczyć i-beam (|) dopasowany do mojego fontu.</p>

                <a
                    href="#test"
                    style={{marginRight: 30}}
                >
                    To jest link
                </a>

                <button follow={"test"} onClick={() => alert('Kliknięto przycisk!')}
                        style={{marginRight: 30}}
                >
                    To jest przycisk
                </button>
                <button onClick={() => alert('Kliknięto przycisk!')}
                        style={{marginRight: 30}}
                >
                    To jest przycisk bez follow
                </button>
                <div
                    data-cursor-content="Wow, custom content!"
                    style={{
                        display: 'inline-block',
                        border: '1px solid #ccc',
                        padding: '8px',
                    }}
                >
                    Najedź na mnie, żeby wyświetlić bąbelek z tekstem
                </div>
            </div>
        </div>
    );
}
