import React from 'react';
import {
    EmailShareButton, EmailIcon,
    FacebookShareButton, FacebookIcon,
    TelegramShareButton, TelegramIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    RedditShareButton, RedditIcon
} from 'react-share';

const ShareModal = ({ url, theme }) => {
    return (
        <div className='d-flex justify-content-between p-4 ' 
            style={{filter: theme ? 'invert(1)': 'invert(0)'}}
        >
            <FacebookShareButton url={url} >
                <FacebookIcon size={32} round={true} />
            </FacebookShareButton>

            <EmailShareButton url={url} >
                <EmailIcon size={32} round={true} />
            </EmailShareButton>

            <TelegramShareButton url={url} >
                <TelegramIcon size={32} round={true} />
            </TelegramShareButton>

            <TwitterShareButton url={url} >
                <TwitterIcon size={32} round={true} />
            </TwitterShareButton>

            <WhatsappShareButton url={url} >
                <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>

            <RedditShareButton url={url} >
                <RedditIcon size={32} round={true} />
            </RedditShareButton>
        </div>
    )
}

export default ShareModal