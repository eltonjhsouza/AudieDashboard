if (!parent.window.userManagerConfig)
{
  throw 'The userManagerConfig is not set.';
}
else
{
  var mgr = new Oidc.UserManager(window.userManagerConfig);
  mgr.signinSilentCallback();
}
