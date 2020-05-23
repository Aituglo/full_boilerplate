ROOT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
VIRTUALENV_ROOT=$(ROOT_DIR)/venv
PYTHON=python

all: setup

start:
	. $(VIRTUALENV_ROOT)/bin/activate; DATABASE_URL="sqlite:///data.db" $(PYTHON) manage.py run

prod:
	. $(VIRTUALENV_ROOT)/bin/activate; uwsgi --protocol=http --wsgi-file uwsgi.py --py-autoreload 1

test:
	. $(VIRTUALENV_ROOT)/bin/activate; py.test tests/ --color=yes

debug:
	. $(VIRTUALENV_ROOT)/bin/activate; $(PYTHON) manage.py run -d -r -p 5000

setup:
	bash setup.sh

init:
	export PYTHONPATH=$PYTHONPATH:ROOT_DIR

db_init:
	$(PYTHON) manage.py db init

db_migrate:
	$(PYTHON) manage.py db migrate

db_upgrade:
	$(PYTHON) manage.py db upgrade
