export const statusSubscription = (notion) => {
  return notion.status().subscribe(status => {
    console.log('STATUS UPDATE: ', status);
  });
}
