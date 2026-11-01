// Native HTML documents deliberately navigate with normal document requests.
export default function NativeAnchor(props) {
  const anchorProps = { ...props };
  delete anchorProps.prefetch;
  return <a {...anchorProps} />;
}
