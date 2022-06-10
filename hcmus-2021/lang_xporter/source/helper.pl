sub read_file {
  open(SRC, '<', @_[0]);
  $res = '';
  while(<SRC>) { $res = $res . $_; }
  return $res;
}

1;
