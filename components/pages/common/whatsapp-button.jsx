import Link from 'next/link';

const WhatsAppButton = () => {
    const buttonStyle = {
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        backgroundColor: '#25D366',
        color: 'white',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
        transition: 'transform 0.2s ease-in-out'
    };

    return (
        <Link 
            href="https://wa.me/971507706746" 
            target="_blank" 
            rel="noopener noreferrer"
            style={buttonStyle}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            aria-label="Chat with us on WhatsApp"
        >
            <i className="fab fa-whatsapp"></i>
        </Link>
    );
};

export default WhatsAppButton;