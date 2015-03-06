
# get Makefile directory name: http://stackoverflow.com/a/5982798/376773
THIS_MAKEFILE_PATH:=$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))
THIS_DIR:=$(shell cd $(dir $(THIS_MAKEFILE_PATH));pwd)

# BIN directory
BIN := $(THIS_DIR)/node_modules/.bin

# applications
NODE ?= node
BABEL ?= $(NODE) $(BIN)/babel
ZUUL ?= $(NODE) $(BIN)/zuul

JS_FILES := $(wildcard *.js)
COMPILED_FILES := $(JS_FILES:%.js=build/%.js)

compile: $(COMPILED_FILES)

install: node_modules

clean:
	rm -rf build

distclean:
	rm -rf node_modules

test:
	@if [ "x$(BROWSER_PLATFORM)" = "x" ]; then \
		$(ZUUL) \
		--ui mocha-bdd \
		--browser-name $(BROWSER_NAME) \
		--browser-version $(BROWSER_VERSION) \
		test/*.js; \
		else \
		$(ZUUL) \
		--ui mocha-bdd \
		--browser-name $(BROWSER_NAME) \
		--browser-version $(BROWSER_VERSION) \
		--browser-platform "$(BROWSER_PLATFORM)" \
		test/*.js; \
	fi

.PHONY: compile install clean distclean test

build:
	@mkdir -p build

node_modules:
	npm install

build/%.js: %.js node_modules build
	@printf '\e[1;93m %-10s\e[m %s > %s\n' "babel" "$<" "$@"
	@$(BABEL) --source-maps-inline --optional runtime --experimental $< --out-file $@
