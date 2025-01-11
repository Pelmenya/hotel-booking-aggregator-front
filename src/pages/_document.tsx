import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render(): JSX.Element {
        return (
            <Html lang="ru" data-theme='light'>
                <Head />
                <body className='bg-base-200'>
                    <Main />
                    <NextScript />
                    <div id="root-portal"></div>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
